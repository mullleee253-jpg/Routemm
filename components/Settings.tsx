'use client'
import styles from './Settings.module.css'

export default function Settings({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.title}>Профиль</h3>
        <div className={styles.item}>
          <span>Имя</span>
          <span className={styles.value}>{user.name}</span>
        </div>
        <div className={styles.item}>
          <span>Email</span>
          <span className={styles.value}>{user.email}</span>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>🔒 Безопасность</h3>
        <div className={styles.item}>
          <span>Двухфакторная аутентификация</span>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.item}>
          <span>Блокировка подозрительных входов</span>
          <label className={styles.switch}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>🔐 Конфиденциальность</h3>
        <div className={styles.item}>
          <span>Кто видит мой статус</span>
          <select className={styles.select}>
            <option>Все</option>
            <option>Контакты</option>
            <option>Никто</option>
          </select>
        </div>
        <div className={styles.item}>
          <span>Кто может звонить</span>
          <select className={styles.select}>
            <option>Все</option>
            <option>Контакты</option>
            <option>Никто</option>
          </select>
        </div>
        <div className={styles.item}>
          <span>Скрыть время последнего визита</span>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>⚙️ Настройки</h3>
        <div className={styles.item}>
          <span>Уведомления</span>
          <label className={styles.switch}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.item}>
          <span>Звук сообщений</span>
          <label className={styles.switch}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.item}>
          <span>Автозагрузка медиа</span>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      <button className={styles.logoutBtn} onClick={onLogout}>
        Выйти из аккаунта
      </button>
    </div>
  )
}
