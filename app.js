Vue.component('game-header',{
    props: ['count'],
    template:`
        <div class="container-fluid alert alert-success text-center">
            <h1>Video Games</h1>
            <h3>Cantidad de Juegos <span class='badge badge-success'>{{count}}</span></h3>
        </div>`
    
});

Vue.component('game-add',	{
    template:`
    <div class="card-body">
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="New Video Game" aria-label="Recipient's username" v-model="titleGame" aria-describedby="button-addon2">
        <div class="input-group-append">
            <button class="btn btn-outline-success"	@click="emitNewGame" type="button" id="button-addon2">Añadir</button>
        </div>
    </div> 
    </div>   
    `,
    data:	function	()	{
        return	{
            titleGame:	null
        }
    },
    methods:	{
        emitNewGame:	function	()	{
            if	(this.titleGame)	{
                this.$emit('new',	{	title:	this.titleGame	});
                this.titleGame	=	null;
            }
        }
    },
});

Vue.component('game-list',	{
    props:	['games'],
    template:	`
    <div class="card-footer" >
        <ol>
            <game-item	v-for="item	in	games"	:game="item" :key="item.id"></game-item>
        </ol>
    </div>
    `
});

Vue.component('game-item',	{
    props:	['game'],
    template:	'<li>{{	game.title	}}</li>'
});

const	app	=	new	Vue({
    el:	'#app',
    template:`
    <div class="view container">
        <game-header v-bind:count="count"></game-header>
        <div class="card">
            <game-add @new="addNewGame"></game-add>
            <game-list v-bind:games="games"></game-list>
        </div>
    </div>    
    `,
    data:{
        games:[
            {	title:	'ME: Andromeda'	},
            {	title:	'Fifa 2017'	},
            {	title:	'League of Legend'	}
        ]
    },
    computed:{
        count: function () {
            // `this` points to the vm instance
            return this.games.length;
          }
    },
    methods: {
        addNewGame: function(name){
            this.games.push(name);
        }
    }
});

