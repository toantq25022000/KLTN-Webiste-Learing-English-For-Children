from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
import competition.routing

application = ProtocolTypeRouter({
    'websocket': AllowedHostsOriginValidator(

        AuthMiddlewareStack(
            URLRouter(
                competition.routing.websocket_urlpatterns
            )
        )
    )
})
