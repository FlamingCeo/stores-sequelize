module.exports = (sequelize, DataTypes) => {

    const Access = sequelize.define(
        "access", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true, // Set auto-increment property
                primaryKey: true,
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            module_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            view: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            update: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            remove: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            fullAccess: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

        }
    );
    Access.associate = (models) => {
        const {
            module,
            role
        } = models
        Access.belongsTo(module, {
            foreignKey: 'module_id'
        })
        Access.belongsTo(role, {
            foreignKey: 'role_id'
        })
    }

    return Access;
}
