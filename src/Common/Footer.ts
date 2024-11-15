import van from 'vanjs-core';

const { div, nav, ol, li, a, span, p } = van.tags;
const Footer = (appTitle: string) => {
  return div(
    { class: 'z-10 dark:bg-stone-900 dark:text-stone-200 py-8 sm:py-16 px-4' },
    nav(
      {
        class: 'my-2 sm:mt-4 overflow-x-auto text-nowrap hide-scrollbar',
      },
      ol(
        { class: 'container flex mx-auto mt-1' },
        li(
          {
            class:
              "after:content-['>'] after:text-sm after:mx-2 after:inline after:text-stone-400 dark:text-stone-600 after-text-bold",
          },
          a(
            {
              class:
                'inline-block text-stone-600 dark:text-stone-300 text-xs underline hover:no-underline leading-7',
              href: '/',
            },
            'Home'
          )
        ),
        li(
          {
            class:
              "after:content-['>'] after:text-sm after:mx-2 after:inline after:text-stone-400 dark:text-stone-600 after-text-bold",
          },
          a(
            {
              class:
                'inline-block text-stone-600 dark:text-stone-300 text-xs underline hover:no-underline leading-7',
              href: 'https://toach.biz/tools/',
            },
            'ツール一覧'
          )
        ),

        li({ class: 'text-xs leading-7' }, appTitle)
      ),
      p(
        { class: 'text-center text-xs mt-4 sm:mt-8' },
        '©︎ ',
        span(`${new Date().getFullYear()}`),
        ' Toach [',
        a(
          {
            class:
              'text-blue-800 dark:text-blue-300 underline hover:no-underline',
            href: 'https://toach.biz/privacy-policy/',
          },
          '個人情報保護方針',
          ']'
        )
      )
    )
  );
};
export default Footer;
