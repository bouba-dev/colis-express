export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

export class ErrorHandler {
  static createError(code: string, message: string, details?: any): AppError {
    return {
      code,
      message,
      details,
      timestamp: new Date()
    }
  }

  static handleApiError(error: any): AppError {
    if (error.code === 'NETWORK_ERROR') {
      return this.createError(
        'NETWORK_ERROR',
        'Erreur de connexion au serveur. Vérifiez votre connexion internet.',
        error
      )
    }

    if (error.code === 'TIMEOUT') {
      return this.createError(
        'TIMEOUT',
        'La requête a pris trop de temps. Veuillez réessayer.',
        error
      )
    }

    if (error.status === 404) {
      return this.createError(
        'NOT_FOUND',
        'La ressource demandée n\'a pas été trouvée.',
        error
      )
    }

    if (error.status === 401) {
      return this.createError(
        'UNAUTHORIZED',
        'Vous n\'êtes pas autorisé à effectuer cette action.',
        error
      )
    }

    if (error.status === 403) {
      return this.createError(
        'FORBIDDEN',
        'Accès interdit à cette ressource.',
        error
      )
    }

    if (error.status === 422) {
      return this.createError(
        'VALIDATION_ERROR',
        'Les données fournies sont invalides.',
        error
      )
    }

    if (error.status >= 500) {
      return this.createError(
        'SERVER_ERROR',
        'Erreur interne du serveur. Veuillez réessayer plus tard.',
        error
      )
    }

    return this.createError(
      'UNKNOWN_ERROR',
      'Une erreur inattendue s\'est produite.',
      error
    )
  }

  static getErrorMessage(error: AppError): string {
    const errorMessages: Record<string, string> = {
      'NETWORK_ERROR': 'Erreur de connexion. Vérifiez votre connexion internet.',
      'TIMEOUT': 'La requête a pris trop de temps. Veuillez réessayer.',
      'NOT_FOUND': 'La ressource demandée n\'a pas été trouvée.',
      'UNAUTHORIZED': 'Vous n\'êtes pas autorisé à effectuer cette action.',
      'FORBIDDEN': 'Accès interdit à cette ressource.',
      'VALIDATION_ERROR': 'Les données fournies sont invalides.',
      'SERVER_ERROR': 'Erreur interne du serveur. Veuillez réessayer plus tard.',
      'UNKNOWN_ERROR': 'Une erreur inattendue s\'est produite.',
      'COLIS_NOT_FOUND': 'Le colis demandé n\'a pas été trouvé.',
      'COLIS_ALREADY_EXISTS': 'Un colis avec ce numéro de suivi existe déjà.',
      'INVALID_STATUS': 'Le statut fourni est invalide.',
      'INVALID_DATA': 'Les données fournies sont invalides.',
    }

    return errorMessages[error.code] || error.message
  }

  static logError(error: AppError): void {
    console.error('Application Error:', {
      code: error.code,
      message: error.message,
      details: error.details,
      timestamp: error.timestamp,
      stack: error.details?.stack
    })
  }

  static isRetryableError(error: AppError): boolean {
    const retryableCodes = ['NETWORK_ERROR', 'TIMEOUT', 'SERVER_ERROR']
    return retryableCodes.includes(error.code)
  }

  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: AppError

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = this.handleApiError(error)
        
        if (!this.isRetryableError(lastError) || attempt === maxRetries) {
          throw lastError
        }

        // Attendre avant de réessayer
        await new Promise(resolve => setTimeout(resolve, delay * attempt))
      }
    }

    throw lastError!
  }
} 