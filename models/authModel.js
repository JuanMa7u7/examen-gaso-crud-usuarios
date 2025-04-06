import dbClient from "../config/dbClient.js"

class AuthModel {

    async login(email) {
        await dbClient.connectDB();
        const colUsers = dbClient.db.collection('users');
        const colUserRoles = dbClient.db.collection('user_roles');
        const colRoles = dbClient.db.collection('roles');

        const user = await colUsers.findOne({ email: email });
        const roleUserQuery = await colUserRoles.findOne({ user_id: user._id });
        const roleID = roleUserQuery.role_id;
        const roleData = await colRoles.findOne({ _id: roleID });
        delete roleData._id;
        return {
            id: user._id,
            username: user.name,
            password: user.password,
            permissions: {
                create: roleData.create,
                read: roleData.read,
                update: roleData.update,
                delete: roleData.delete,
            }
        };
    }
}

export default new AuthModel;