module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        "role", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true, // Set auto-increment property
                primaryKey: true,
            },
            roleName: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }
    );
    Role.associate = (models) => {
        const {
            user_role,
            access
        } = models
        Role.hasMany(user_role, { foreignKey: 'role_id' });
        Role.hasMany(access, { foreignKey: 'role_id' });


    }

    return Role;
}
