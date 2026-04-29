import { NextRequest, NextResponse } from "next/server";

type DemoRequestPayload = {
  name?: string;
  company?: string;
  title?: string;
  contact?: string;
  requestType?: string;
  message?: string;
};

const contactPattern = /^(\+?\d[\d\s-]{6,}\d|[^\s@]+@[^\s@]+\.[^\s@]+)$/;

export async function POST(request: NextRequest) {
  let payload: DemoRequestPayload;

  try {
    payload = (await request.json()) as DemoRequestPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "请求格式不正确，请检查后重试。" },
      { status: 400 },
    );
  }

  const name = payload.name?.trim();
  const company = payload.company?.trim();
  const contact = payload.contact?.trim();
  const requestType = payload.requestType?.trim();

  if (!name || !company || !contact || !requestType) {
    return NextResponse.json(
      { ok: false, message: "请填写姓名、公司、联系方式和需求类型。" },
      { status: 400 },
    );
  }

  if (!contactPattern.test(contact)) {
    return NextResponse.json(
      { ok: false, message: "请填写有效的手机号或邮箱。" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "预约信息已提交，我们会尽快联系您。",
    requestId: `demo_${Date.now()}`,
  });
}
