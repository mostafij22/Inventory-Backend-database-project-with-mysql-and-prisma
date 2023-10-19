
Inventory Backend project with prisma
=======================================

1. ERD Diagram
2. NextJS Prisma Project Intigration/create
3. Migration Structure (schema.prisma)
4. Database Table 
5. API Project Structure Setup
   utility>middleware.js
login purboborti ghotona and login poroborti ghotonar majhe kaj kore middleware.js
user varified kina, login korese kina ta jachai kore middleware .
login purboborti ghotona gulu k app>api>dashboard bole deya ase.



============================================================================================
============================================================================================


======Aggregate (avg,count,max,min,sum)======

const result = await prisma.Employee.aggregate({
      _avg: { salary: true },
      _count: { salary: true },
      _max: { salary: true },
      _min: { salary: true },
      _sum: { salary: true },
});


======Aggregate (groupBy,having)======

const result = await prisma.Employee.groupBy({
       by: ["city"],
       _count: { salary: true },
})

const result = await prisma.Employee.groupBy({
      by: ["city"],
      _sum: { salary: true },
      having: { city: "Chicago"},
})


===========Pagination================

// Using cursor
const result = await prisma.Employee.findMany({
     cursor: { id: 2 },
     take: 3,
})

// Using Limit Offset
const result = await prisma.Employee.findMany({
      skip: 2,
      take: 3,
})


===========Query Time Enable Logging================

// Time Calculation
const startTime = Date.now();
const result = await prisma.Employee.findMany()
const executionTime = (Date.now() - startTime) + " milliseconds";


// query | info | warn | error
const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']});
const result = await prisma.Employee.findMany()



==========Raw queries=====================

const prisma = new PrismaClient();
const result = await prisma.$queryRaw `SELECT * FROM employee`;




========Transactions & Rollback================


    try {
        const prisma = new PrismaClient();

        const createUser = prisma.User.create({
            data:{email:"john1.doe@example.com", password:"123"}
        })

        const deleteComment=prisma.Comment.delete({
            where:{id:5}
        })

        const result=await prisma.$transaction([createUser, deleteComment])

        console.log(result)
    }
    catch (e) {

        console.log(e)
    }





======================Comparison Operators======================

Comparison Operators:

1. equals: Matches values that are equal to the specified value.
2. not: Negates the condition, matching values that are not equal to the specified value.
3. in: Matches values that are in a specified array of values.
4. notIn: Matches values that are not in a specified array of values.
5. lt (Less Than): Matches values that are less than the specified value.
6. lte (Less Than or Equal To): Matches values that are less than or equal to the specified value.
7. gt (Greater Than): Matches values that are greater than the specified value.
8. gte (Greater Than or Equal To): Matches values that are greater than or equal to the specified value.
9. contains: Matches values that contain a specified substring.
10. startsWith: Matches values that start with a specified substring.
11. endsWith: Matches values that end with a specified substring.


const result = await prisma.Employee.findMany({
    where:{salary:{equals:75000}}
})

const result = await prisma.Employee.findMany({
    where:{salary:{lt:75000}}
})

const result = await prisma.Employee.findMany({
    where:{salary:{lte:75000}}
})

const result = await prisma.Employee.findMany({
    where:{salary:{gt:75000}}
})

const result = await prisma.Employee.findMany({
    where:{salary:{gte:75000}}
})

const result = await prisma.Employee.findMany({
    where:{salary:{not:75000}}
})

const result = await prisma.Employee.findMany({
    where:{salary:{in:[75000,60000]}}
})

const result = await prisma.Employee.findMany({
    where:{salary:{notIn:[75000,60000]}}
})


const result = await prisma.Employee.findMany({
    where:{name:{contains:'John'}}
})

const result = await prisma.Employee.findMany({
      where:{name:{startsWith:'J'}}
})


const result = await prisma.Employee.findMany({
      where:{name:{endsWith:'n'}}
})


======================Logical Operators======================

1. AND: Combines multiple conditions with logical AND.
2. OR: Combines multiple conditions with logical OR.
3. NOT: Negates a condition.


const result = await prisma.Employee.findMany({
    where:{
         AND: [
              { name: {contains:"Alice"} },
              { salary: { gt: 50000 } }
           ]
     }
})

const result = await prisma.Employee.findMany({
    where:{
         OR: [
              { name: {contains:"Alice"} },
              { salary: { gt: 50000 } }
           ]
     }
})

const result = await prisma.Employee.findMany({
     where:{
          NOT:[
               { name: {contains:"Alice"} },
               { salary: { gt: 90000 } }
          ]
      }
})




======================Date Operators=============================

1. lt (Less Than): Matches dates that are before the specified date.
2. lte (Less Than or Equal To): Matches dates that are on or before the specified date.
3. gt (Greater Than): Matches dates that are after the specified date.
4. gte (Greater Than or Equal To): Matches dates that are on or after the specified date.

        const result=await prisma.Employee.findMany({
            where:{
                birthDay:{
                    lt:new Date("2023-10-11"),
                    gt:new Date("2017-10-11")
                }
            }
        });







