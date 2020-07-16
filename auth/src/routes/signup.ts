import express, {Request, Response} from 'express';
import { body, validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connections-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
      .isEmail()
      .withMessage('Email deve ser válido'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20})
      .withMessage('Password deve ter entre 4 e 20 caracteres')
],
async (req: Request, res: Response) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array());
  }
  
  console.log('Criando usuário.')
  throw new DatabaseConnectionError();
  
  res.send({ message: 'Done!'});

});

export { router as signupRouter };