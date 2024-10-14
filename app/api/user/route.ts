import { NextRequest, NextResponse } from "next/server";

export  function GET() {
    return NextResponse.json({msg: 'Hello from backend'});
}