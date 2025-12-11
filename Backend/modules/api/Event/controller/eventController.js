import statusCode from '../../../../config/statusCode.js';
import eventModel from '../../../../models/eventModel.js';
import dotenv from 'dotenv';
// import { EventValidation } from '../../validationRules.js';
dotenv.config();

export const addEvent = async (req, res) => {
  try {
    // const { error } = EventValidation.validate(req.body);
    // if (error) {
    //   return res.status(statusCode.VALIDATION_ERROR).json({
    //     message: 'Validation error',
    //     error: error.message,
    //   });
    // }
    const { ename, edate, evenues, eprice, elocation, category, capacity } =
      req.body;

    const newEvent = new eventModel({
      ename,
      edate,
      evenues,
      eprice,
      elocation,
      category,
      capacity,
      user: req.user.id,
      eimage: req.file?.filename,
    });

    await newEvent.save();
    return res.status(statusCode.SUCCESS).json({
      message: 'Event added successfully',
      newEvent,
    });
  } catch (error) {
    console.log('error', error.message);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: 'error adding events',
    });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 6, sort } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { ename: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
        ],
      };
    }

    if (category) {
      query.category = category;
    }

    let sortOption = {};

    switch (sort) {
      case 'date_asc':
        sortOption.edate = 1;
        break;

      case 'date_desc':
        sortOption.edate = -1;
        break;

      default:
        sortOption.date = 1;
    }

    const skip = (page - 1) * limit;

    const total = await eventModel.countDocuments(query);

    const event = await eventModel
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    return res.status(statusCode.SUCCESS).json({
      message: 'Events fetched successfully',
      event,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log('error', error.message);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: 'error getting events',
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.query;
    const { ename, edate, category } = req.body;

    const update = await eventModel.findByIdAndUpdate(
      id,
      { ename, edate, category },
      { new: true },
    );

    return res.status(statusCode.SUCCESS).json({
      message: 'update event success',
      update,
    });
  } catch (error) {
    console.log('error', error.message);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: 'error updating events',
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.query;

    const deleteEvent = await eventModel.findByIdAndDelete(id);
    if (!deleteEvent) {
      return res.status(statusCode.NOT_FOUND).json({
        message: 'event not found',
        deleteEvent,
      });
    }

    return res.status(statusCode.SUCCESS).json({
      message: 'delete event success',
    });
  } catch (error) {
    console.log('error', error.message);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: 'error updating events',
    });
  }
};
