import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) { 
   
    await prisma.todo.deleteMany(); // delete * from todo
    await prisma.user.deleteMany(); // delete * from user

    const user = await prisma.user.create({
        data: {
            email: 'test1@test.com',
            password: bcrypt.hashSync('test'),
            name: 'Test User',
            roles: ['admin','client'],
            todos: {
                create: [{
                    description: "Piedra del alma", complete: true
                },{
                    description: "Piedra del poder"
                },{
                    description: "Piedra del espacio"
                },{
                    description: "Piedra del realidad"
                }]
            }
        }
    })

  return NextResponse.json({
    message: "seed executed",
    user
  })
}