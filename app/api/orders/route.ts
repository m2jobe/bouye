import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { customer_name, customer_email, customer_phone, items, notes } =
      body;

    if (!customer_name || !customer_email || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Name, email, and at least one item are required" },
        { status: 400 },
      );
    }

    // Calculate total
    const total = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0,
    );

    const { data, error } = await supabaseAdmin
      .from("bouye_orders")
      .insert({
        customer_name,
        customer_email,
        customer_phone: customer_phone || null,
        items,
        total,
        notes: notes || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 },
      );
    }

    return NextResponse.json({ order: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
