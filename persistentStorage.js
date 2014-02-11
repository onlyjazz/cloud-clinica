// Persistent browser storage useful for storing variables across forms, used in maskCRFByRole
      function setStore(k,v) {
	      localStorage.setItem(k, v);
	      return;
      }

      function getStore(k) {
	      return localStorage.getItem(k);
      }