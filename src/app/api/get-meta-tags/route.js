import axios from "axios";
import * as cheerio from "cheerio";

import { NextResponse } from "next/server";
export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is missing" },
        { status: 400 },
      );
    }

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const metaTags = {};

    $("meta").each((i, meta) => {
      const property = $(meta).attr("property") || $(meta).attr("name");
      const content = $(meta).attr("content");

      if (property && content) {
        metaTags[property] = content;
      }
    });

    return NextResponse.json(metaTags);
  } catch (error) {
    if (error.response && error.response.status) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: error.response.status },
      );
    }

    console.error("Error fetching meta tags:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};

