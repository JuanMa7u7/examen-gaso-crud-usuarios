const validatePasswordSecurity = (password) => {
    const REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/;
    return String(password).match(REGEX) != null;
}

export default validatePasswordSecurity;