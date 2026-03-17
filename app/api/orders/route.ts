import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customer_name,
      customer_email,
      customer_phone,
      order_type,
      delivery_address,
      delivery_fee,
      items,
      notes,
    } = body;

    if (!customer_name || !customer_email || !customer_phone || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Name, email, phone, and at least one item are required" },
        { status: 400 },
      );
    }

    if (order_type === "delivery" && !delivery_address) {
      return NextResponse.json(
        { error: "Delivery address is required for delivery orders" },
        { status: 400 },
      );
    }

    // Calculate total
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0,
    );
    const total = subtotal + (delivery_fee || 0);

    const { data, error } = await supabaseAdmin
      .from("bouye_orders")
      .insert({
        customer_name,
        customer_email,
        customer_phone,
        order_type: order_type || "pickup",
        delivery_address: delivery_address || null,
        delivery_fee: delivery_fee || 0,
        items,
        subtotal,
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
