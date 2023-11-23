import { Sequelize,DataTypes, Model  } from "sequelize";

const Plan  = (sequelize: Sequelize) => {
     class Plan extends Model {
        public id?: string
        public name?: string
        public description?: string
        public amount?: number
        public duration?: number
        public interest_rate?: number
        public vendor_id?: string
        public createdAt?: Date
        public updatedAt?: Date
    }
    
    Plan.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        interest_rate: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        vendor_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "vendor",
                key: "id",
            },
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at:{
            type: DataTypes.DATE,
            allowNull: false,
        }

}, {
    sequelize: sequelize,
    modelName: "plan",
})
return Plan
}

export default Plan