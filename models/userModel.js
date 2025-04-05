import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js"
import getCurrentDate from "../helpers/getCurrentDate.js";

class UserModel {

    async create(user) {
        // VERIFICA QUE EXISTE EL ROL QUE SE LE QUIERE ASIGNAR AL USUARIO
        const colRoles = dbClient.db.collection('roles');
        const requestRole = await colRoles
            .find({ "name": user.role })
            .project({ "_id": true })
            .limit(1)
            .toArray();
        if (requestRole.length == 0)
            throw new Error('El rol especificado no existe.');
        const roleID = requestRole[0]._id;

        const colUsers = dbClient.db.collection('users');
        // VERIFICA QUE EL EMAIL DEL USUARIO A REGISTRAR NO ESTE UN USO
        const requestEmailIsAlreadyRegistered = await colUsers
            .find({ "email": user.email })
            .project({ "email": true })
            .limit(1)
            .toArray();
        if (requestEmailIsAlreadyRegistered.length > 0)
            throw new Error('El email ya se encuentra registrado.');

        const dataUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            creation_date: getCurrentDate()
        };

        const insertUser = await colUsers.insertOne(dataUser);
        const insertedUserID = insertUser.insertedId;

        const colUserRoles = dbClient.db.collection('user_roles');
        await colUserRoles.insertOne({ user_id: insertedUserID, role_id: roleID });

        return { success: true };
    }

    async update(id, data) {
        const colUsers = dbClient.db.collection('users');
        // SI SE ESPECIFICO UN NUEVO EMAIL, SE VERIFICA QUE NO ESTE UN USO
        if (typeof data.email != 'undefined') {
            const requestEmailIsAlreadyRegistered = await colUsers
                .find({ "email": data.email, "_id": { "$ne": new ObjectId(id) } })
                .project({ "email": true })
                .limit(1)
                .toArray();
            if (requestEmailIsAlreadyRegistered.length > 0)
                throw new Error('El email ya se encuentra registrado.');
        }

        let roleID;
        if (typeof data.role != 'undefined') {
            const colRoles = dbClient.db.collection('roles');
            const requestRole = await colRoles
                .find({ "name": data.role })
                .project({ "_id": true })
                .limit(1)
                .toArray();
            if (requestRole.length == 0)
                throw new Error('El rol especificado no existe.');
            roleID = requestRole[0]._id;
        }

        const dataUser = {
            name: data.name || undefined,
            email: data.email || undefined,
            password: data.password || undefined
        };

        await colUsers.updateOne({ _id: new ObjectId(id) }, { "$set": dataUser });
        if (roleID) {
            const colUserRoles = dbClient.db.collection('user_roles');
            await colUserRoles.updateOne({ user_id: new ObjectId(id) }, { "$set": { role_id: roleID } });
        }

        return { success: true };
    }

    async patch(id, data) {
        const colUsers = dbClient.db.collection('users');
        // SI SE ESPECIFICO UN NUEVO EMAIL, SE VERIFICA QUE NO ESTE UN USO
        if (typeof data.email != 'undefined') {
            const requestEmailIsAlreadyRegistered = await colUsers
                .find({ "email": data.email, "_id": { "$ne": new ObjectId(id) } })
                .project({ "email": true })
                .limit(1)
                .toArray();
            if (requestEmailIsAlreadyRegistered.length > 0)
                throw new Error('El email ya se encuentra registrado.');
        }

        let roleID;
        if (typeof data.role != 'undefined') {
            const colRoles = dbClient.db.collection('roles');
            const requestRole = await colRoles
                .find({ "name": data.role })
                .project({ "_id": true })
                .limit(1)
                .toArray();
            if (requestRole.length == 0)
                throw new Error('El rol especificado no existe.');
            roleID = requestRole[0]._id;
        }

        const userData = await colUsers.findOne({ _id: new ObjectId(id) });
        const dataUser = {
            name: data.name || undefined,
            email: data.email || undefined,
            password: data.password || undefined
        };
        Object.entries(dataUser).forEach(([key, value]) => {
            if (value)
                userData[key] = value;
        });

        await colUsers.updateOne({ _id: new ObjectId(id) }, { "$set": userData });
        if (roleID) {
            const colUserRoles = dbClient.db.collection('user_roles');
            await colUserRoles.updateOne({ user_id: new ObjectId(id) }, { "$set": { role_id: roleID } });
        }

        return { success: true };
    }

    async delete(id) {
        const colUsers = dbClient.db.collection('users');
        const colUserRoles = dbClient.db.collection('user_roles');
        await colUsers.deleteOne({ _id: new ObjectId(id) });
        await colUserRoles.deleteOne({ user_id: new ObjectId(id) });
        return { success: true };
    }

    async getAll(filters) {
        const colUsers = dbClient.db.collection('users');
        const colUserRoles = dbClient.db.collection('user_roles');
        const colRoles = dbClient.db.collection('roles');

        const PIPELINE = [];
        const matchPipeline = {}
        Object.entries(filters.data).forEach(([key, value]) => {
            if (value)
                matchPipeline[key] = { $regex: value, $options: 'i' };
        });
        if (Object.entries(matchPipeline).length >= 1)
            PIPELINE.push({ $match: matchPipeline });
        if (filters.sort)
            PIPELINE.push({ $sort: { [filters.sort]: 1 } });
        if (!isNaN(filters.limit) && !isNaN(filters.page) && filters.page >= 1)
            PIPELINE.push({ $skip: (filters.page - 1) * filters.limit });
        if (!isNaN(filters.limit))
            PIPELINE.push({ $limit: filters.limit });
        console.log(PIPELINE);
        const userDataQuery = await colUsers.aggregate(PIPELINE);
        const userData = [];
        for await (let user of userDataQuery) {
            const roleIDQuery = await colUserRoles
                .find({ user_id: user._id })
                .project({ role_id: true })
                .toArray();
            const roleID = roleIDQuery[0].role_id;
            const roleData = await colRoles
                .find({ _id: roleID })
                .limit(1)
                .toArray();
            delete roleData[0]._id;
            userData.push({
                ...user,
                role: { ...roleData[0] }
            });
        }

        return userData;
    }

    async getOne(id) {
        const colUsers = dbClient.db.collection('users');
        const colUserRoles = dbClient.db.collection('user_roles');
        const colRoles = dbClient.db.collection('roles');

        const userData = await colUsers.findOne({ _id: new ObjectId(id) });
        const roleUserQuery = await colUserRoles.findOne({ user_id: userData._id });
        const roleID = roleUserQuery.role_id;
        const roleData = await colRoles.findOne({ _id: roleID });
        delete roleData._id;

        return { ...userData, role: { ...roleData } };
    }
}

export default new UserModel;