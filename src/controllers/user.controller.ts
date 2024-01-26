import { NextFunction, Request, Response } from 'express';
import { ChangeUserPasswordDto, UserDto, UserEnabledDto } from '@dtos/user.dto';
import { AuthRecord } from '@interfaces/auth.interface';
import { mapQueryToGetAllUsersParams } from '@mappers/user.mappers';
import UserService from '@services/user.service';

class UserController {
  public userService: UserService = UserService.getInstance();

  public getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.userService.getAllUsers(mapQueryToGetAllUsersParams(req.query));
      const response = { data, message: 'Users retrieved' };
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username } = req.params;
      const data = await this.userService.getUserByUsername(username);
      const response = { data, message: 'User retrieved' };
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public addUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userDto: UserDto = req.body;
      const data = await this.userService.addUser(userDto);
      const response = { data, message: 'User added successfully' };
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public setUserEnabled = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userEnabledDto: UserEnabledDto = req.body;
      await this.userService.setUserEnabled(id, userEnabledDto);
      const response = { message: 'User enabled modified' };
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public changeUserPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id }: AuthRecord = res.locals.auth;
      const pwDto: ChangeUserPasswordDto = req.body;
      await this.userService.changeUserPassword(id, pwDto);
      const response = { message: 'User password changed' };
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export default UserController;
