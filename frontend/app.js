const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const user = ref(null);
    const timetable = ref([]);
    const loading = ref(false);
    const error = ref('');
    const login = ref({ id: 'A23CS0086', password: '123456', role: 'student' });

    const API_BASE = 'http://localhost:3001/api';

    const handleLogin = async () => {
      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(login.value)
        });
        const data = await res.json();
        if (data.success) {
          user.value = data.user;
          loadTimetable();
        } else {
          error.value = data.message;
        }
      } catch (err) {
        error.value = 'Login failed';
      }
    };

    const loadTimetable = async () => {
      if (!user.value) return;
      loading.value = true;
      try {
        const res = await fetch(`${API_BASE}/timetable?id=${user.value.id}&role=${user.value.role}`);
        const data = await res.json();
        timetable.value = data.timetable || [];
      } catch (err) {
        console.error(err);
        timetable.value = [];
      }
      loading.value = false;
    };

    const logout = () => {
      user.value = null;
      timetable.value = [];
    };

    return {
      user,
      timetable,
      loading,
      error,
      login,
      handleLogin,
      logout
    };
  }
}).mount('#app');