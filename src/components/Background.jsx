import React from 'react';

function Background({ isThemeDark }) {
  return (
    <div aria-hidden className="absolute inset-0 size-full">
      <div className="h-[35%] bg-(--main-bg)">
        {isThemeDark && (
          <picture>
            <source media="(width>=540px)" srcSet="images/bg-desktop-dark.jpg" />
            <img className="object-cover size-full object-center" src="images/bg-mobile-dark.jpg" alt="Background image" />
          </picture>
        )}
        {!isThemeDark && (
          <picture>
            <source media="(width>=540px)" srcSet="images/bg-desktop-light.jpg" />
            <img className="object-cover size-full object-center" src="images/bg-mobile-light.jpg" alt="Background image" />
          </picture>
        )}
      </div>
      <div className="h-[65%] bg-(--main-bg)"></div>
    </div>
  );
}

export default Background;
