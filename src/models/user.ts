import { Sequelize , Model, } from "sequelize"
import { hashPassword } from "../funct/password"
import { BeforeCreate } from "sequelize-typescript";

const User=(sequelize: Sequelize,DataTypes) => {
    class user extends Model {
       public id?: string
       public fname?: string
       public lname?: string
       public email?: string
       public password?: string
       public national_id?: number
       public role? :string
       public reset_token?:string
       public reset_token_expires? : Date
       public is_active?: boolean
       public is_account_verified?:boolean
       public verification_token?: string
       public verification_token_expires?: Date
       public address_id?: string
       public krapin?: string
       public latitude?: string
       public longitude?: string
       public createdAt?: Date
       public updatedAt?: Date

    @BeforeCreate
    static async hashPassword(instance: user) {
        const password = instance.dataValues.password
        instance.password = await hashPassword({password})
       
    }
    }
    user.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        national_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        krapin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "address",
                key: "id",
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        reset_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        reset_token_expires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_account_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        verification_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        verification_token_expires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    
     },{
        sequelize,
        modelName: "user",
        tableName: "user",
     }
      )
     return user
}    

export default User