import { EventSubscriber, EntitySubscriberInterface, InsertEvent, getRepository } from 'typeorm';
import { UserClockIn } from '@entity/UserClockIn';
import UserClockInLimitExceeded from '@errors/DatabaseError';
import AppDataSource from '@repositories/index';
import { getWeek } from '@utils/date';

@EventSubscriber()
export class UserClockInSubscriber implements EntitySubscriberInterface<UserClockIn> {
  listenTo() {
    return UserClockIn;
  }

  async beforeInsert(event: InsertEvent<UserClockIn>) {
    const userClockIn = event.entity;
    const isWeeklyLimitExceeded = await this.isWeeklyLimitExceeded(userClockIn);
    const hasAlreadyClockedInToday = await this.hasAlreadyClockedInToday(userClockIn);

    if (isWeeklyLimitExceeded) {
      throw new UserClockInLimitExceeded('User reached weekly clock in limit');
    }

    if (hasAlreadyClockedInToday) {
      throw new UserClockInLimitExceeded('User has already clocked in today');
    }
  }

  private async isWeeklyLimitExceeded(userClockIn: UserClockIn): Promise<boolean> {
    const currentDate = new Date();
    const count = await AppDataSource.getRepository(UserClockIn)
      .createQueryBuilder('userClockIn')
      .select('COUNT(*)', 'count')
      .where('userClockIn.id_user = :userId', { userId: userClockIn.id }) // Replace with the actual user ID
      .andWhere("date_part('YEAR', userClockIn.created) = :year", {
        year: currentDate.getFullYear(),
      })
      .andWhere("date_part('WEEK', userClockIn.created) = :week", { week: getWeek(currentDate) })
      .getRawOne();
    return false; // Replace with your actual logic
  }

  private async hasAlreadyClockedInToday(userClockIn: UserClockIn): Promise<boolean> {
    // Implement your logic to check if the user has already clocked in for the SportActivity today
    // Example: const count = await getRepository(UserClockIn).count({ where: { ... } });
    return false; // Replace with your actual logic
  }
}
