module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        "role", {
            roleID: {
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
                unique: true
            },
            roleName: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }
    );
    Role.associate = (models) => {
        const {
            staff_role,
            access
        } = models
        Role.hasMany(staff_role, { foreignKey: 'RoleID' });
        Role.hasMany(access, { foreignKey: 'RoleID' });


    }

    return Role;
}
