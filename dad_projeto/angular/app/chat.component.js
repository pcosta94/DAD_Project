"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var websocket_service_1 = require('./notifications/websocket.service');
var auth_service_1 = require('./auth.service');
var ChatComponent = (function () {
    function ChatComponent(websocketService, authService) {
        this.websocketService = websocketService;
        this.authService = authService;
    }
    ChatComponent.prototype.send = function () {
        // TODO: sends a chat messsage
        var json = {
            user: this.authService.user,
            message: this.message
        };
        this.websocketService.sendChatMessage(json);
        this.message = '';
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat-control',
            templateUrl: 'chat.component.html'
        }), 
        __metadata('design:paramtypes', [websocket_service_1.WebSocketService, auth_service_1.AuthService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map