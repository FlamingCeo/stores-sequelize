module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define(
        "user_role", {
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            role_id: {
                type: DataTypes.UUID,
                allowNull: false,
            }
        }
    );
    UserRole.associate = (models) => {
        const {
            user,
            role,
        } = models
        UserRole.belongsTo(staff, {
            foreignKey: 'user_id'
        })
        UserRole.belongsTo(role, {
            foreignKey: 'role_id'
        })



    }

    return UserRole;
}
