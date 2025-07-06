const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      console.log(`🌐 Appel API: ${url}`)
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Réponse API:`, data)
      return { data }
    } catch (error) {
      console.error('❌ Erreur API:', error)
      return {
        error: error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite'
      }
    }
  }

  // Méthodes pour les colis
  async getColis(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/colis')
  }

  async getColisById(id: number): Promise<ApiResponse<any>> {
    return this.request<any>(`/colis/${id}`)
  }

  async createColis(colisData: any): Promise<ApiResponse<any>> {
    return this.request<any>('/colis', {
      method: 'POST',
      body: JSON.stringify(colisData),
    })
  }

  async updateColis(id: number, colisData: any): Promise<ApiResponse<any>> {
    return this.request<any>(`/colis/${id}`, {
      method: 'PUT',
      body: JSON.stringify(colisData),
    })
  }

  async deleteColis(id: number): Promise<ApiResponse<any>> {
    return this.request<any>(`/colis/${id}`, {
      method: 'DELETE',
    })
  }

  // Méthodes pour les utilisateurs
  async getUtilisateurs(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/utilisateur')
  }

  async getUtilisateurById(id: number): Promise<ApiResponse<any>> {
    return this.request<any>(`/utilisateur/${id}`)
  }

  // Méthodes pour les tarifs
  async getTarifs(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/tarif')
  }

  // Méthodes pour les statuts
  async getStatuts(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/statut')
  }

  // Méthodes pour les notifications
  async getNotifications(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/notification')
  }
}

export const apiService = new ApiService() 