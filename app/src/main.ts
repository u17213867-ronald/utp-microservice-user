import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ExceptionsFilter } from './app/filter/exception.filter'
import { ConfigService } from './context/common/infrastructure/services/config.service'
import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { CustomException } from './context/common/application/exceptions/custom.exception'
import { RequestInterceptor } from './app/interceptor/request.interceptor'
import { ResponseInterceptor } from './app/interceptor/response.interceptor'
import { LoggerInterceptor } from './app/interceptor/logger.interceptor'

export function getErrorMessage(error: any): string | null {
  if (error.constraints) {
    const constraintTypes = Object.keys(error.constraints)
    return error.constraints[constraintTypes[0]]
  } else if (error.children && error.children.length > 0) {
    for (const childError of error.children) {
      const errorMessage = getErrorMessage(childError)
      if (errorMessage) {
        return errorMessage
      }
    }
  }

  return null
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })

  app.useGlobalInterceptors(new RequestInterceptor(), new ResponseInterceptor(), new LoggerInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const trace = errors.map((error) => ({          
          property: error.property,
          message: getErrorMessage(error) ?? 'Unknown error',
        }))
        return new CustomException('Bad request parameters.', HttpStatus.BAD_REQUEST, trace, trace)
      },
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.useGlobalFilters(new ExceptionsFilter())

  const config: any = app.get(ConfigService)
  const name: string = config.get('APP_NAME')
  const version: string = config.get('APP_VERSION')
  const titleDocs: string = config.get('APP_DOCS_TITLE')
  const descriptionDocs: string = config.get('APP_DOCS_DESCRIPTION')
  app.setGlobalPrefix(`v${version}/${name}`)

  const options = new DocumentBuilder()
    .setTitle(titleDocs)
    .setDescription(descriptionDocs)
    .setVersion(`${version}.0`)
    .addTag(`v${version}/${name}`)
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(`v${version}/${name}/doc`, app, document)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
