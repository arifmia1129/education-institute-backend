import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IExam } from "./exam.interface";
import { paginationField } from "../../constant/pagination";
import { ExamService } from "./exam.service";
import { translator } from "../../../shared/translator";

const createExam = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamService.createExamService(req.body);

  sendResponse<IExam>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created Exam",
    data: result,
  });
});

const getExam = catchAsync(async (req: Request, res: Response) => {
  const { ln } = req.params;
  const paginationOptions: Pagination = pick(req.query, paginationField);
  const result = await ExamService.getExamService(paginationOptions);

  if (result.data.length) {
    const translatedExams = await Promise.all(
      result.data.map(async Exam => {
        const translatedTitle = await translator(Exam.title, ln);
        Exam.title = translatedTitle;
        return Exam;
      }),
    );

    result.data = translatedExams;
  }

  sendResponse<IExam[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Exam",
    meta: result.meta,
    data: result.data,
  });
});

const getExamById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamService.getExamByIdService(id);
  sendResponse<IExam>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Exam",
    data: result,
  });
});

const updateExamById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamService.updateExamByIdService(id, req.body);
  sendResponse<IExam>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated Exam",
    data: result,
  });
});

const deleteExamById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamService.deleteExamByIdService(id);
  sendResponse<IExam>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully deleted Exam",
    data: result,
  });
});

export const ExamController = {
  createExam,
  getExam,
  getExamById,
  updateExamById,
  deleteExamById,
};
