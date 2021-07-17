
const Sequelize = require('sequelize');
const { STRING, DECIMAL, TEXT, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/junior_project');
const faker = require('faker')

const Campus = conn.define('campus', {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    imageUrl: {
        type: STRING,
        defaultValue: 'https://media-exp3.licdn.com/dms/image/C4E0BAQG9P2EiLkiaeQ/company-logo_200_200/0/1560291501578?e=2159024400&v=beta&t=x7Abbb6wfqEn43T8XkPdY4ojUnK_2uP2hatR8PS7MM8'
    },
    address: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: TEXT('long'),
    }
});

const Student = conn.define('student', {
    firstName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        } 
    },
    lastName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        } 
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    imageUrl: {
        type: STRING,
        defaultValue: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Face_Emoji_grande.png?v=1571606036'
    },
    gpa: {
        type: DECIMAL,
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
});

Student.belongsTo(Campus, { as: 'campus' });
Campus.hasMany(Student, { as: 'students' });

/*const rando_school = { 
    name: 'School of Hard Knocks',
    address: faker.address.streetAddress(),
    description: faker.lorem.paragraph()
}*/

const student_Set = Array.from({length: 20}, (_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
})
);

const syncAndSeed = async()=> {
    await conn.sync({ force: true });
    const [hard_knock] = await Promise.all([
        Campus.create({ 
            name: 'School of Hard Knocks',
            address: faker.address.streetAddress(),
            description: faker.lorem.paragraph()
        })
    ]);
    /*await Promise.all(
        [rando_school].map(object => Campus.create({
            name: object.name,
            address: object.address,
            description: object.description
        }))
    );*/
    await Promise.all(
        student_Set.map(object => Student.create({
            firstName: object.firstName,
            lastName: object.lastName,
            email: object.email,
            gpa: 4.0,
            campusId: hard_knock.id
        }))
    );
    console.log(hard_knock.id)
};

module.exports = {
    models: {
        Campus,
        Student
    }, 
    syncAndSeed
}