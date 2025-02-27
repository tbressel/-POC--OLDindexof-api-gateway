import { Response } from "express";
import { getJsonResponse } from "../functions/notifications";
import { notificationMessages } from "../config/notifications-config";
import validator from 'validator';
// import { baseUrl } from '../config';

export const handleContentService = async (res: Response, slug: string, action: string, memoId: string) => {
  try {
    // Clean the slug, action, and memoId to prevent XSS attacks
    slug = validator.escape(slug);
    action = validator.escape(action);
    memoId = validator.escape(memoId);
    let memoIdInt: number = parseInt(memoId);

    // Check if the param is defined
    if (!slug) {
      getJsonResponse(res, 400, "no-param-name", notificationMessages, false);
      return;
    }

    // Check if the param is defined
    if (!action) {
      getJsonResponse(res, 400, "no-query-name", notificationMessages, false);
      return;
    }

    console.log('GATEWAY ->', ' Route content/', slug);
    console.log('GATEWAY ->', ' Valeur de action : ', action);
    console.log('GATEWAY ->', ' Valeur de memoIdInt : ', memoIdInt);

    let uri: string = "";

    if (slug === "carousel" && action === "get") {
      uri = `content/v1/${slug}/${action}`;
    } else if (slug === "index" && action === "get" && memoIdInt && memoIdInt > 0) {
      uri = `content/v1/${slug}/${action}/${memoIdInt}`;
    }

    console.log('GATEWAY ->', ' Valeur de uri : ', uri);

    // const response = await fetch(`${baseUrl.apiContent}/${uri}`);
    const data: any = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error handling content service request:', error);
    getJsonResponse(res, 500, "fetch-fail", notificationMessages, false);
  }
};