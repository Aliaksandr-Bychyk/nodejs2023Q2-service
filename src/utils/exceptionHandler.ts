import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

const errorList = [
  { code: '400', handler: BadRequestException },
  { code: '403', handler: ForbiddenException },
  { code: '404', handler: NotFoundException },
  { code: '401', handler: UnauthorizedException },
  { code: '422', handler: UnprocessableEntityException },
];

const exceptionHandler = (error: Error) => {
  throw new (errorList.find((item) => item.code === error.message).handler)();
};

export default exceptionHandler;
