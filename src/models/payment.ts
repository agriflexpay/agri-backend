import { Sequelize,DataTypes,Model  } from "sequelize";

import { } from "sequelize-typescript";

const Payment=(sequelize: Sequelize) => {
    class Payment extends Model{
        public code?: string
        public amount?: number
        public paymentMode?: string
        public user_id?: string
        public plan_id?: string
        public vendor_id?: string
        public phone?: number
        public createdAt?: Date
        public updatedAt?: Date
    }

    Payment.init({
        code: {
            primaryKey: true,
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        paymentMode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        plan_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "plan",
                key: "id",
            },
        },
        vendor_id: {
            type: DataTypes.STRING,
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
        phone:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "phone",
            },
        },
        updated_at:{
            type: DataTypes.DATE,
            allowNull: false,
        }
        
    },{
        sequelize,
        tableName: "payment"
    })

    return Payment
}
export default Payment