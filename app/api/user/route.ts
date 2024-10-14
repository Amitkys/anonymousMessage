import { NextRequest, NextResponse } from "next/server";
import {z, ZodError} from 'zod';

const userSchema = z.object({
    firstName:
        z.string({message: "first name should be string"})
            .min(3, { message: 'first name is too short' })
            .max(10, { message: 'first name is too long' }),
    lastName:
        z.string({message: "last name should be string"})
            .min(3, { message: 'last name is too short' })
            .max(10, { message: 'last name is too long' }),
})

export  function GET() {
    return NextResponse.json({msg: 'Hello from backend'});
}
export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const body = await req.json();
        const validateData = userSchema.parse(body);
        return NextResponse.json({msg: 'Received valid data', data: validateData});
    }catch(error) {
        if(error instanceof ZodError){
            return NextResponse.json({msg: 'Received invalid data', error: error.errors[0].message});
        }
        return NextResponse.json({msg: 'something went wrong'});
    }
}