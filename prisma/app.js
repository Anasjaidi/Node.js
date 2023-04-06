const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();


const main = async () => {
  const user = prisma.user.create({data: {"email": "anas.jaidi@icloud.com",}})

  return user
}


main().then(res => console.log(res)).catch(err => console.error(err)).finally(() => {
  prisma.$disconnect()
})