// import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';
import { trigger, state, style, AnimationMetadata, transition, animate, keyframes} from '@angular/animations';
// Component transition animations
export const ScaleDownUpAnimation =
  trigger('ScaleDown', [
    state('1',
      style({
        opacity: 0,
        transform: 'scale(.5)',  
      })
    ),

    state('2',
        style({
          opacity: 1,
          transform: 'scale(1)',        
        })
      ),
      
    transition('1 <=> 2' , animate('300ms ease-out')),
    
  ]);

export const backgroundOpacity = 
    trigger('card', [
          
      state('initial', style({
        transform: 'translate3d(0,50%,0) scale(.8)',                
      })),

      state('final' ,style({
        transform: 'translate3d(0,0,0) scale(1)',       
        
      })),      

      transition('initial <=> final' , animate('300ms ease-out')),
    ]);

export const cardPop = 
  trigger('background', [
    
    state('initial', style({        
      opacity: 0
    })),

    state('final' ,style({
            
      opacity: 1
    })),      

    transition('initial <=> final' , animate('250ms ease-out')),
  ]);    

  export const Card  = 
trigger('card', [
      
    state('initial', style({
      transform: 'translate3d(0,50%,0) scale(.7)',                
    })),

    state('final' ,style({
      transform: 'translate3d(0,0,0) scale(1)',       
      
    })),      

    transition('initial <=> final' , animate('350ms ease-out')),
  ]);

 export const BackgroundCard = trigger('background', [
    
    state('initial', style({        
      opacity: 0
    })),

    state('final' ,style({
            
      opacity: 1
    })),      

    transition('initial <=> final' , animate('250ms ease-out')),
  ]);

  export const LogoPop  = 

trigger('loaderImg', [
      
    state('initial', style({
      transform: 'translate3d(0,80%,0) scale(.7)',        
      opacity: 0
    })),

    state('final' ,style({
      transform: 'translate3d(0,0,0) scale(1)',       
      opacity: 1
    })),      

    transition('initial <=> final' , animate('1000ms ease-out')),
  ]);

export const BackgroundLogo =
  trigger('loader', [
    
    state('initial', style({        
      opacity: 1
    })),

    state('final' ,style({
      display: 'none',       
      opacity: 0
    })),      

    transition('initial <=> final' , animate('500ms ease-out')),
  ]);

  export const SlideAnimation = 

trigger('principal', [                
        state('*' ,style({
        transform: 'translate3d(0,0,0)',               
        })),      
        
        transition(':enter', [
        style({
            transform: 'translate3d(100%,0,0)',
        }),
        animate('550ms ease-out')
        ]),

        transition('void => *', [
        style({
            transform: 'translate3d(100%,0,0)',          
        }),
        animate('350ms ease-in')
        ]),
    ]);

export const FadeAnimation = 

trigger('background', [
        
        state('*', style({        
        opacity: .65
        })),                  
        
        transition(':enter', [
        style({
            opacity: 0,          
        }),
        animate('0.3s ease-out')
        ]),

        transition(':leave', [
        animate('0.5s ease-out', style({
            opacity: 0,          
        }))
        ])

    ])
;
