import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { INotice } from "./notice.interface";
import { paginationField } from "../../constant/pagination";
import { NoticeService } from "./notice.service";
import { translator } from "../../../shared/translator";

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeService.createNoticeService(req.body);

  sendResponse<INotice>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created Notice",
    data: result,
  });
});

const getNotice = catchAsync(async (req: Request, res: Response) => {
  const { ln } = req.params;
  const paginationOptions: Pagination = pick(req.query, paginationField);
  const result = await NoticeService.getNoticeService(paginationOptions);

  if (result.data.length) {
    const translatedNotices = await Promise.all(
      result.data.map(async notice => {
        const translatedTitle = await translator(notice.title, ln);
        notice.title = translatedTitle;
        return notice;
      }),
    );

    result.data = translatedNotices;
  }

  sendResponse<INotice[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Notice",
    meta: result.meta,
    data: result.data,
  });
});

const getNoticeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeService.getNoticeByIdService(id);
  sendResponse<INotice>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Notice",
    data: result,
  });
});

const updateNoticeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeService.updateNoticeByIdService(id, req.body);
  sendResponse<INotice>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Notice",
    data: result,
  });
});

const deleteNoticeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeService.deleteNoticeByIdService(id);
  sendResponse<INotice>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully deleted Notice",
    data: result,
  });
});

export const NoticeController = {
  createNotice,
  getNotice,
  getNoticeById,
  updateNoticeById,
  deleteNoticeById,
};
