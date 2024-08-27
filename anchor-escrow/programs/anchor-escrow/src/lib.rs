use anchor_lang::prelude::*;


declare_id!("GT2xcgeotPZzzgb924oUh1zvEU4WBkrfkk2WP86UBdE7");

pub mod state;
pub use state::*;

pub mod instructions;
pub use instructions::*;

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn make(ctx: Context<Make>, seed: u64, receive: u64, amount: u64) -> Result<()> {

        let _ = ctx.accounts.init_escrow(seed, receive, ctx.bumps.escrow);
        
        ctx.accounts.deposit_to_vault(amount)
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        ctx.accounts.withdraw_and_close()
    }

    pub fn take(ctx: Context<Take>) -> Result<()> {
        let _ = ctx.accounts.withdraw_and_close();

        ctx.accounts.withdraw_and_close()
    }
}

