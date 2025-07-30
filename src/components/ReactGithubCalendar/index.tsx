import GitHubCalendar from 'react-github-calendar';
import classnames from 'classnames';
import styles from './index.module.scss';

const themeFromColorscheme = [ "var(--theme-background)", "var(--theme-accent)"]
const theme = { light: themeFromColorscheme, dark: themeFromColorscheme }

export default function ReactGithubCalendar({username}: {username: string}) {
  return (
    <div className={classnames(styles['scroll-container'], 'github-calendar my-6')}>
      <GitHubCalendar username={username} theme={theme} year="last" />
    </div>
  );
}