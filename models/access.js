module.exports = (sequelize, DataTypes) => {

    const Access = sequelize.define(
        "access", {
            id: {
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
                unique: true
            },
            role_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            module_id: {
                type: DataTypes.UUID,
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
        Access.belongsTo(access_module, {
            foreignKey: 'module_id'
        })
        Access.belongsTo(role, {
            foreignKey: 'role_id'
        })
    }

    return Access;
}
