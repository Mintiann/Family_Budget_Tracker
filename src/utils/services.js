function fetchAPI (endpoint, options) {
    return fetch(endpoint, options)
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(response => {
        if (response.ok) {
          return response.json();
        }
  
        return response.json()
          .catch(err => Promise.reject({ error: err }))
          .then(resJson => {
            return Promise.reject({ error: resJson.error });
          });
      });
  }
  
  export function fetchAddRecords ({ item, amount }) {
    return fetchAPI('/api/records', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ item, amount }),
    });
  }
  
  export function fetchDeleteRecords (id) {
    return fetchAPI(`/api/records/${id}`, {
      method: 'DELETE',
    });
  }
  
  
  export function fetchRecords () {
    return fetchAPI('/api/records ');
  }

  export function fetchFamilyRecords () {
    return fetchAPI('/api/familyRecords ');
  }


  
  export function fetchSession () {
    return fetchAPI('/api/sessions', {
      method: 'GET',
    });
  }
  
  export function fetchLogout () {
    return fetchAPI('/api/sessions', {
      method: 'DELETE',
    });
  }
  
  export function fetchLogin (username) {
    return fetchAPI('/api/sessions', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    });
  }