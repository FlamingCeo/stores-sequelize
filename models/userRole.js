module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define(
        "user_role", {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    );
    UserRole.associate = (models) => {
        const {
            user,
            role,
        } = models
        UserRole.belongsTo(user, {
            foreignKey: 'user_id'
        })
        UserRole.belongsTo(role, {
            foreignKey: 'role_id'
        })



    }

    return UserRole;
}
