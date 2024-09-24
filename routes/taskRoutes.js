import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task to the user's task list.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task.
 *               description:
 *                 type: string
 *                 description: Detailed description of the task.
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 description: The current status of the task.
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date for the task.
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Error creating task.
 */
router.post("/", authMiddleware, createTask);

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieves a list of all tasks for the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the task.
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized access.
 */
router.get("/", authMiddleware, getTasks);

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Get a single task
 *     description: Retrieves a specific task by ID.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized access.
 */
router.get("/:id", authMiddleware, getTask);

/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Update a task
 *     description: Updates an existing task by ID.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Error updating task.
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized access.
 */
router.put("/:id", authMiddleware, updateTask);

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a specific task by ID.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized access.
 */
router.delete("/:id", authMiddleware, deleteTask);

export default router;
