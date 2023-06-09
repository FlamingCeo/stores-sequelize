module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define(
        "module", {
            id: {
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            parent_id: {
                type: DataTypes.UUID,
                defaultValue: null
            }
        }
    );
    Module.associate = (models) => {
        const {
            access
        } = models
        Module.hasMany(access, { foreignKey: 'module_id' });
    }
    return Module;
}
