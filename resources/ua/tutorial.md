# Як працює інструмент

### 1. Визначення потреби

Перш за все треба визначити потребу, яку необхідно задовольнити:

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/steps/bulb_steps_1.jpg)

У випадку із електричними лампами внутрішнього освітлення такою потребою може бути одна з наступних опцій:
- Придбання конкретно визначеної лампи - потребою є лампа конкретного типу, потужності та з певним цоколем

- Типовий проект з освітлення - потреба полягає у вирішенні інженерної задачі з організації освітлення приміщення певного типу призначення, площі та облаштування, за відомих умов режиму експлуатації такого приміщення

- Нетиповий проект з освітлення - потреба полягає у вирішенні інженерної задачі з організації освітлення нетипового (специфічного) приміщення, певної площі та облаштування, за відомих умов режиму експлуатації такого приміщення

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/steps/bulb_steps_2.jpg)

Для прикладу, оберемо опцію “типовий проект з освітлення”.

Наступним кроком необхідно деталізувати категорію приміщення та конкретний тип (згідно чинної класифікації ДБН):

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/steps/bulb_steps_3.jpg)

… та зазначити технічні характеристики приміщення: його площу та кількість світлоточок, що є в наявності або передбачено типовим проектом:

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/steps/bulb_steps_4.jpg)

###  2. Вимоги до технічних характеристик лампи

Як тільки з усіма параметрами приміщення завершено, можна переходити до характеристик необхідних ламп. На наступному кроці необхідно надати інформацію про тип цоколя лампи, що відповідає наявним або передбаченим в приміщенні світлоточкам. Для цього, спершу, треба обрати один з запропонованих типів та зазначити конкретний стандарт цоколя з обраного типу:

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/steps/bulb_steps_5.jpg)

Для прикладу, оберемо найпоширеніші: тип цоколя “Е” (лампи Едісона) та цоколь Е27.

В результаті аналізу довідкових даних, що закладено в систему, на основі наданих параметрів лампи, автоматично буде визначено, які типи ламп відповідають даній конфігурації. І тільки визначений перелік буде запропоновано до вибору задля запобігання розрахунку показників для технічно-неіснуючого продукту:

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/steps/bulb_steps_6.jpg)

Для прикладу оберемо найпростіший і, зазвичай, найдешевший тип лампи - лампу розжарювання.

Провівши додатковий аналіз технічних характеристик, що щойно був доповнений визначенням типу лампи, система знайде і запропонує до вибору варіанти застосування освітлення, що доступні для поточної конфігурації лампи (тип цоколя + тип лампи). І в якості наступного кроку, необхідно визначитися з цим способом застосування:

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/steps/bulb_steps_7.jpg)

### 3. Вимоги до режиму освітлення

В заключній частині збору даних для розрахунку необхідно надати інформацію щодо режиму використання приміщення і, відповідно - до вимог щодо режиму освітлення. Така інформація є опційною, адже може бути невідомою заздалегідь, але її наявність зробить розрахунок більш точним, а запропоноване рішення - більш ефективним. Отже, необхідно зазначити:
- Кількість годин на день, протягом яких приміщення має освітлюватись
- Кількість робочих днів на тиждень

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/steps/bulb_steps_8.jpg)

… а також - тариф на електроенергію, що встановлено для категорії споживачів, до якої відноситься майбутній користувач освітлення. Ця інформація також не є обов'язковою для подальшого розрахунку, але, за наявності, значною мірою впливає на його якість:

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/steps/bulb_steps_9.jpg)

## Що є результатом роботи:

Після отримання та опрацювання всієї інформації, що описано вище, система пропонує  комбінований результат:

## Modals

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/modals/bulb_modals_1.jpg)

> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/modals/bulb_modals_2.jpg)

> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/modals/bulb_modals_3.jpg)

> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

![](https://github.com/BulbProject/bulb-project-frontend/blob/develop/src/assets/images/resources/modals/bulb_modals_4.jpg)

> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
