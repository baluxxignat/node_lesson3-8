module.exports = {
    userToNormalize: (userToNormalize) => {
        const fildsToRemove = [
            'password',
            '__v'
        ];

        userToNormalize = userToNormalize.toObject();
        // console.log(userToNormalize);

        fildsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};
