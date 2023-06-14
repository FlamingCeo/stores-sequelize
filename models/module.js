module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define(
        "module", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true, // Set auto-increment property
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            parent_id: {
                type: DataTypes.INTEGER,
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
