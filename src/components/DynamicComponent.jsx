// components/DynamicComponent.jsx
"use client";

import React from "react";
import JsxParser from "react-jsx-parser";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function extractJsxOrReturnCode(componentString) {
  const returnRegex = /return\s*\(\s*([\s\S]*?)\s*\);?/;
  const match = returnRegex.exec(componentString);
  return match ? match[1].trim() : componentString.trim();
}

const DynamicComponent = ({ codeStr }) => {
  const jsxString = extractJsxOrReturnCode(codeStr);

  return (
    <JsxParser
      jsx={jsxString}
      components={{
        Image,
        Button,
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
        Input,
        Label,
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
      }}
      renderInWrapper={false}
      allowUnknownElements={true}
      showWarnings={true}
    />
  );
};

export default DynamicComponent;
