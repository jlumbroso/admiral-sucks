# Admiral Sucks!

This provides a Chrome extension meant to neutralize
[Admiral's AdBlock Recovery service](https://www.getadmiral.com/adblock-recovery)
with the click a button. Whenever the AdBlock Recovery paywall invites you to
"Turn off your AdBlocker", click this button instead.

## 2024 Update

As of January 7, 2024, this extension, untouched, works with a wide range of websites because the heuristic it uses to target the anti-AdBlock paywall is fairly robust.

Some resistant websites have emerged, and I am actively investigating them. Please report specific URLs in the issues. Thank you!

## Install

[Download this repository](https://github.com/jlumbroso/admiral-sucks/archive/master.zip),
unzip, and drag the `admiral-sucks` folder to your Chrome extension panel
at [`chrome://extensions`](chrome://extensions).

## Why?

[Admiral](https://www.getadmiral.com/adblock-recovery) is a company that makes
money from helping web site monetize their content. They provide a variety
of services, but one that is very distasteful is the _AdBlock Recovery_: First,
they show a website how much inbound traffic uses an adblocker; second, they
offer to block such adblockers; third, they promise only to take 30% of new
revenue brought in from the paywall---therefore paying for itself!

News, especially local news, deserves to be supported. But [not at the expense
of our mental health](https://www.psychologytoday.com/us/blog/ulterior-motives/201008/what-does-advertising-do).

At the heart of the problem, the Internet offers us access to a wide variety of
different publications and websites. We do not want to have a full subscription
package to each of those, but would rather be able to purchase articles on a
unit basis. This requires a micropayment infrastructure that has taken very
long to implement the right way.

Indeed, a much more holistic solution to the problem of adblocking, is
[Scroll](https://scroll.com/): Users pay a fixed subscription every month
($5/month) and this money is distributed to all participating websites that
the user visits, prorated to the proportion of content consumed on each website;
in exchange, the participating websites agree to not display any ads. This is
a win-win: In this way, users get a reprieve from advertisement while not
hurting their wallet; and content creators obtain much more money than
they would with ads (and even more than they would with Admiral's AdBlocker
Recovery).

## License

This project is licensed under [The Unlicense](https://unlicense.org/).
It means you can do anything you want this, for whatever purposes, you don't
have to credit me, this project, or anything.
