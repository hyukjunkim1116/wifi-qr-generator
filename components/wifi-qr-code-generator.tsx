"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QRCodeSVG } from "qrcode.react";

export default function Component() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [backgroundColor, setBackgroundColor] = useState("bg-white");
  const [qrCode, setQrCode] = useState("");

  const generateQRCode = () => {
    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    setQrCode(wifiString);
  };

  const colorOptions = [
    { value: "bg-white", label: "흰색" },
    { value: "bg-gray-200", label: "회색" },
    { value: "bg-red-200", label: "빨간색" },
    { value: "bg-blue-200", label: "파란색" },
    { value: "bg-green-200", label: "초록색" },
  ];

  return (
    <div className="w-full p-6 flex justify-center">
      <div
        className={`space-y-4 ${backgroundColor} p-6 rounded-lg mx-auto max-w-md`}
      >
        <div className="border-2 border-gray-300 rounded-lg p-4 text-center bg-white">
          <p className="mb-2 text-sm text-gray-600">WIFI 접속</p>
          {qrCode ? (
            <QRCodeSVG value={qrCode} size={200} />
          ) : (
            <div className="w-48 h-48 mx-auto bg-gray-200"></div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">브랜드 이름</Label>
          <Input id="brand" value="스타벅스 자양점" readOnly />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ssid">네트워크 이름(SSID)</Label>
          <Input
            id="ssid"
            placeholder="네트워크 이름 입력"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="encryption">암호화 유형</Label>
          <Select value={encryption} onValueChange={setEncryption}>
            <SelectTrigger id="encryption">
              <SelectValue placeholder="암호화 유형 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WPA">WPA/WPA2</SelectItem>
              <SelectItem value="WEP">WEP</SelectItem>
              <SelectItem value="nopass">암호화 없음</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>배경색 선택</Label>
          <RadioGroup
            value={backgroundColor}
            onValueChange={setBackgroundColor}
            className="flex space-x-2"
          >
            {colorOptions.map((color) => (
              <div key={color.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={color.value}
                  id={color.value}
                  className={`w-4 h-4 rounded-full ${color.value}`}
                />
                <Label htmlFor={color.value} className="sr-only">
                  {color.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Button className="w-full" onClick={generateQRCode}>
          생성하기
        </Button>
      </div>
    </div>
  );
}
