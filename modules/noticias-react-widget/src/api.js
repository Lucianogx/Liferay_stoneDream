const api = {
  get: async () => {
    const params = new URLSearchParams();

    // Adicionar token de autenticação Liferay se disponível
    if (typeof Liferay !== 'undefined' && Liferay.authToken) {
      params.append('p_auth', Liferay.authToken);
    }

    const url = `/o/c/noticias?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  post: async (data) => {
    const url = `/o/c/noticias`;
    try {
      const response = await Liferay.Util.fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return { result };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default api;