const getName = (firstName: string, lastName?: string): string => {
    if (lastName !== undefined && lastName !== null && lastName !== '') {
        return `${firstName} ${lastName}`;
    }
    return firstName;
};

export default getName;
